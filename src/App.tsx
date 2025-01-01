import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './schemas/formSchema';
import { CompanySelector } from './components/CompanySelector';
import { CustomerForm } from './components/CustomerForm';
import { VehicleTypeSelector } from './components/VehicleTypeSelector';
import { VehicleForm } from './components/VehicleForm';
import { ServiceForm } from './components/ServiceForm';
import { PDFTemplateManager } from './components/PDFTemplateManager';
import { VerificationDocuments } from './components/VerificationDocuments';
import { ResetButton } from './components/ResetButton';
import { LoginButton } from './components/LoginButton';
import { PreparationServiceSection } from './components/preparation/PreparationServiceSection';
import { AuthProvider } from './components/auth/AuthProvider';
import type { FormData } from './types';
import { getDefaultFormValues } from './utils/formUtils';

export default function App() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(),
    mode: 'onChange'
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <FormProvider {...methods}>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Formularcenter
                    </h1>
                    <LoginButton />
                  </div>

                  <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                    <CompanySelector />
                    <CustomerForm />
                    <VerificationDocuments />
                    <VehicleTypeSelector />
                    <VehicleForm />
                    <ServiceForm />
                    <PDFTemplateManager />
                    <PreparationServiceSection />
                    
                    <div className="flex justify-end space-x-4">
                      <ResetButton />
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Speichern
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    </FormProvider>
  );
}