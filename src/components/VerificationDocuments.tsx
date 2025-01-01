import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { FormData } from '../types';

export const VerificationDocuments: React.FC = () => {
  const { register, control } = useFormContext<FormData>();
  const customerType = useWatch({
    control,
    name: 'customer.type',
  });
  const isforeign = useWatch({
    control,
    name: 'customer.isforeign',
  });

  if (!(customerType === 'business' && isforeign)) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Nachweise</h2>
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="entryReceipt"
            {...register('customer.verificationDocuments.entryReceipt')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="entryReceipt" className="ml-2 block text-sm text-gray-700">
            Gelangensnachweis
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="transferConfirmation"
            {...register('customer.verificationDocuments.transferConfirmation')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="transferConfirmation" className="ml-2 block text-sm text-gray-700">
            Verbringungsbestätigung
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="destinationRegistration"
            {...register('customer.verificationDocuments.destinationRegistration')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="destinationRegistration" className="ml-2 block text-sm text-gray-700">
            Zulassung Bestimmungsland
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="signedCMR"
            {...register('customer.verificationDocuments.signedCMR')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="signedCMR" className="ml-2 block text-sm text-gray-700">
            CMR Empfänger unterschrieben
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="taxationProof"
            {...register('customer.verificationDocuments.taxationProof')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="taxationProof" className="ml-2 block text-sm text-gray-700">
            Versteuerungsnachweis Bestimmungsland
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="buyerRegistration"
            {...register('customer.verificationDocuments.buyerRegistration')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="buyerRegistration" className="ml-2 block text-sm text-gray-700">
            Zulassung auf Käufer
          </label>
        </div>
      </div>
    </div>
  );
};