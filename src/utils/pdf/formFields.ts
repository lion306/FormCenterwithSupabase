import { format } from 'date-fns';
import { FormData, WorkOrderItem } from '../../types';
import { COMPANY_LOCATIONS } from '../../types/company';
import { BILLING_TYPE_MAPPING, MANUFACTURER_MAPPING, MAX_WORK_ORDER_ITEMS, WORK_ORDER_MAPPING } from './constants';
import { PDFError } from './errors';
import { PDFForm } from 'pdf-lib';
import { usePreparationStore } from '../../store/usePreparationStore';

export function fillCompanyFields(form: PDFForm, formData: FormData): void {
  const location = COMPANY_LOCATIONS.find(loc => loc.id === formData.company.locationId);
  if (!location) {
    throw new PDFError('Standort nicht gefunden');
  }

  const companyFields = {
    Name_Company: location.name,
    Street_Company: location.street,
    Plz_Company: location.zipCode,
    City_Company: location.city,
    Ust_Id_Company: location.vatId || '',
    Datum: format(new Date(), 'dd.MM.yyyy'),
    Verkäufer: formData.service.workOrder.seller,
    Intern_Nr: formData.service.workOrder.internalVehicleNumber,
    Abstellort: formData.service.workOrder.vehicleLocation,
    Fertigstellungsdatum_Werkstatt: formData.service.workOrder.workshopCompletionDate || '',
    Auslieferungsdatum_Kunde: formData.service.workOrder.customerDeliveryDate ? 
      `${formData.service.workOrder.customerDeliveryDate}${formData.service.workOrder.customerDeliveryTime ? ` ${formData.service.workOrder.customerDeliveryTime}` : ''}` : '',
  };

  for (const [fieldName, value] of Object.entries(companyFields)) {
    try {
      const field = form.getTextField(fieldName);
      if (field) {
        field.setText(value);
      }
    } catch (error) {
      console.warn(`Fehler beim Befüllen des Feldes ${fieldName}:`, error);
    }
  }
}

export function fillCustomerFields(form: PDFForm, formData: FormData): void {
  const customerFields = {
    'Vorname': formData.customer.type === 'private' ? formData.customer.firstName : '',
    'Name': formData.customer.type === 'private' ? formData.customer.lastName : formData.customer.companyName,
    'Strasse': formData.customer.street,
    'Plz': formData.customer.zipCode,
    'Stadt': formData.customer.city,
    'Land': formData.customer.isforeign ? formData.customer.country : '',
    'Ust_Id': formData.customer.type === 'business' && formData.customer.isforeign ? formData.customer.vatId : '',
    'KV_Nr': formData.customer.type === 'business' && formData.customer.isforeign ? formData.customer.contractNumber : '',
    'Marke': formData.vehicle.brand === 'Sonstige' ? formData.vehicle.customBrand : formData.vehicle.brand,
    'Modell': formData.vehicle.model,
    'VIN': formData.vehicle.vin,
    'Fzg_Nachweis': formData.vehicle.damageInfo,
    'Motor': formData.vehicle.engine,
    'Norm': formData.vehicle.emissionStandard,
    'Bj': formData.vehicle.year.toString(),
    'Hersteller': formData.vehicle.brand === 'Sonstige' ? formData.vehicle.customBrand : MANUFACTURER_MAPPING[formData.vehicle.brand]
  };

  for (const [fieldName, value] of Object.entries(customerFields)) {
    try {
      const field = form.getTextField(fieldName);
      if (field) {
        field.setText(String(value));
      }
    } catch (error) {
      console.warn(`Fehler beim Befüllen des Feldes ${fieldName}:`, error);
    }
  }
}

export function fillVerificationDocuments(form: PDFForm, formData: FormData): void {
  if (formData.customer.type === 'business' && formData.customer.isforeign && formData.customer.verificationDocuments) {
    const docs = formData.customer.verificationDocuments;
    const selectedDocs = [];
    
    if (docs.entryReceipt) selectedDocs.push('• Gelangensnachweis');
    if (docs.transferConfirmation) selectedDocs.push('• Verbringungsbestätigung');
    if (docs.destinationRegistration) selectedDocs.push('• Zulassung Bestimmungsland');
    if (docs.signedCMR) selectedDocs.push('• CMR Empfänger unterschrieben');
    if (docs.taxationProof) selectedDocs.push('• Versteuerungsnachweis Bestimmungsland');
    if (docs.buyerRegistration) selectedDocs.push('• Zulassung auf Käufer');

    for (let i = 0; i < selectedDocs.length && i < 6; i++) {
      try {
        const field = form.getTextField(`Nachweis_${i + 1}`);
        if (field) {
          field.setText(selectedDocs[i]);
        }
      } catch (error) {
        console.warn(`Fehler beim Befüllen des Feldes Nachweis_${i + 1}:`, error);
      }
    }
  }
}

export function fillWorkOrders(form: PDFForm, formData: FormData): void {
  const workOrder = formData.service.workOrder;
  const selectedWorks: Array<{
    name: string;
    description?: string;
    billingType: string;
  }> = [];

  // Get preparation service details if selected
  if (workOrder.preparation?.selected && workOrder.preparation.serviceId) {
    const { getServicesByLocation } = usePreparationStore.getState();
    const services = getServicesByLocation(formData.company.locationId);
    const selectedService = services.find(s => s.id === workOrder.preparation?.serviceId);

    if (selectedService) {
      selectedWorks.push({
        name: WORK_ORDER_MAPPING.preparation,
        description: `${selectedService.name} - ${selectedService.price.toFixed(2)} €`,
        billingType: BILLING_TYPE_MAPPING[workOrder.preparation.billingType]
      });
    }
  }

  // Add other work order items
  Object.entries(workOrder).forEach(([key, value]) => {
    if (key !== 'workshopCompletionDate' && 
        key !== 'customerDeliveryDate' && 
        key !== 'customerDeliveryTime' && 
        key !== 'seller' && 
        key !== 'internalVehicleNumber' && 
        key !== 'vehicleLocation' &&
        key !== 'preparation') {
      const item = value as WorkOrderItem;
      if (item.selected) {
        selectedWorks.push({
          name: WORK_ORDER_MAPPING[key as keyof typeof WORK_ORDER_MAPPING],
          description: item.description,
          billingType: BILLING_TYPE_MAPPING[item.billingType]
        });
      }
    }
  });

  // Fill work order fields up to MAX_WORK_ORDER_ITEMS
  for (let i = 0; i < selectedWorks.length && i < MAX_WORK_ORDER_ITEMS; i++) {
    const work = selectedWorks[i];
    const index = i + 1;

    try {
      const workField = form.getTextField(`Arbeit_${index}`);
      if (workField) {
        workField.setText(work.name);
      }

      if (work.description) {
        const descField = form.getTextField(`Beschreibung_arbeit_${index}`);
        if (descField) {
          descField.setText(work.description);
        }
      }

      const billingField = form.getTextField(`Abrechnung_${index}`);
      if (billingField) {
        billingField.setText(work.billingType);
      }
    } catch (error) {
      console.warn(`Fehler beim Befüllen der Arbeitsauftragsfelder ${index}:`, error);
    }
  }
}

export function fillServiceFields(form: PDFForm, formData: FormData): void {
  try {
    const serviceField = form.getTextField('Service');
    if (serviceField) {
      if (formData.service.isNewService) {
        serviceField.setText('Neu');
      } else {
        const serviceText = formData.service.serviceDate && formData.service.serviceKm
          ? `${formData.service.serviceDate} / ${formData.service.serviceKm} km`
          : formData.service.serviceDate || formData.service.serviceKm;
        serviceField.setText(serviceText || '');
      }
    }
  } catch (error) {
    console.warn('Fehler beim Befüllen des Service-Feldes:', error);
  }

  try {
    const oelField = form.getTextField('Oel');
    if (oelField) {
      if (formData.service.isNewOilChange) {
        oelField.setText('Neu');
      } else {
        const oelText = formData.service.oilChangeDate && formData.service.oilChangeKm
          ? `${formData.service.oilChangeDate} / ${formData.service.oilChangeKm} km`
          : formData.service.oilChangeDate || formData.service.oilChangeKm;
        oelField.setText(oelText || '');
      }
    }
  } catch (error) {
    console.warn('Fehler beim Befüllen des Ölwechsel-Feldes:', error);
  }

  try {
    const huField = form.getTextField('Hu');
    if (huField) {
      if (formData.service.isNewInspection) {
        huField.setText('Neu');
      } else {
        huField.setText(formData.service.inspectionDate || '');
      }
    }
  } catch (error) {
    console.warn('Fehler beim Befüllen des HU/AU-Feldes:', error);
  }
}