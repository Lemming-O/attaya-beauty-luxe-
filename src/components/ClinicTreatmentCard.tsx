import React from 'react';
import { Clock, User, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { ClinicTreatment } from '../types';

interface ClinicTreatmentCardProps {
  treatment: ClinicTreatment;
  onBook: (treatment: ClinicTreatment) => void;
}

export const ClinicTreatmentCard: React.FC<ClinicTreatmentCardProps> = ({
  treatment,
  onBook,
}) => {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EADEC9] overflow-hidden shadow-luxe hover:shadow-luxe-hover transition-all duration-300 flex flex-col md:flex-row">
      
      {/* Visual Image */}
      <div className="md:w-2/5 relative h-60 md:h-auto overflow-hidden bg-[#FAF8F5]">
        <img
          src={treatment.image}
          alt={treatment.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-[#141414]/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {treatment.category}
        </div>
      </div>

      {/* Details & Info */}
      <div className="md:w-3/5 p-6 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
            <span className="flex items-center text-[#8C6B1F] font-medium">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {treatment.durationMinutes} Menit
            </span>
            <span>•</span>
            <span className="text-[#C5A059] font-medium">{treatment.recommendedInterval}</span>
          </div>

          <h3 className="font-serif-luxe text-2xl text-[#1A1A1A] font-semibold leading-snug">
            {treatment.title}
          </h3>

          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {treatment.subtitle}
          </p>

          {/* Doctor credit */}
          <div className="mt-3 flex items-center space-x-2 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EADEC9] text-xs">
            <User className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="text-[#1A1A1A] font-medium truncate">{treatment.doctorSpecialist}</span>
          </div>

          {/* Targeted Concerns */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {treatment.targetedConcerns.map((tc, idx) => (
              <span key={idx} className="px-2.5 py-0.5 bg-rose-50 text-[#B76E79] border border-rose-200 text-[10px] font-medium rounded-full">
                {tc}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Booking Button */}
        <div className="pt-4 border-t border-[#F0E6D6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs text-gray-400 block">Biaya Treatment:</span>
            <span className="text-xl font-bold text-[#1A1A1A]">
              {formatIDR(treatment.price)}
            </span>
          </div>

          <button
            onClick={() => onBook(treatment)}
            className="w-full sm:w-auto px-6 py-3 bg-gold-gradient text-white rounded-xl text-xs font-semibold shadow-xs hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Reservasi Treatment</span>
          </button>
        </div>

      </div>

    </div>
  );
};
