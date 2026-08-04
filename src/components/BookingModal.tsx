import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { ClinicTreatment, TreatmentBooking, UserProfile } from '../types';

interface BookingModalProps {
  treatment: ClinicTreatment | null;
  user: UserProfile;
  onClose: () => void;
  onConfirmBooking: (booking: Omit<TreatmentBooking, 'id' | 'bookingNumber' | 'createdAt'>) => TreatmentBooking;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  treatment,
  user,
  onClose,
  onConfirmBooking,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('14:00 - 15:30 WIB');
  const [selectedTherapist, setSelectedTherapist] = useState(treatment?.doctorSpecialist || '');
  const [patientName, setPatientName] = useState(user.name);
  const [patientPhone, setPatientPhone] = useState(user.phone);
  const [patientEmail, setPatientEmail] = useState(user.email);
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<TreatmentBooking | null>(null);

  if (!treatment) return null;

  const timeSlots = [
    '09:30 - 11:00 WIB',
    '11:30 - 13:00 WIB',
    '14:00 - 15:30 WIB',
    '16:00 - 17:30 WIB',
    '18:30 - 20:00 WIB'
  ];

  const therapistOptions = [
    treatment.doctorSpecialist,
    'dr. Aurelia Attaya, Sp.DVE (Founder & Lead Dermatologist)',
    'dr. Raymond S., M.Biomed (Laser Specialist)',
    'Ners Senior Estetik Attaya Luxe'
  ];

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = onConfirmBooking({
      userId: user.id,
      userName: patientName,
      userPhone: patientPhone,
      userEmail: patientEmail,
      treatmentId: treatment.id,
      treatmentTitle: treatment.title,
      treatmentPrice: treatment.price,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      therapist: selectedTherapist,
      status: 'Terkonfirmasi',
      notes: notes || undefined
    });
    setConfirmedBooking(result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#D4AF37]/30 shadow-2xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* Confirmation View */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Reservasi Berhasil</span>
              <h2 className="font-serif-luxe text-3xl font-bold text-[#1A1A1A]">Jadwal Treatment Terkonfirmasi</h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Konfirmasi reservasi dan rincian janji medis telah dikirimkan ke email <span className="font-semibold text-gray-700">{patientEmail}</span>.
              </p>
            </div>

            {/* Booking Details Ticket */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4AF37]/40 text-left space-y-3 shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-[#EADEC9]">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-mono">Nomor Reservasi VIP</span>
                  <span className="text-sm font-bold text-[#8C6B1F]">{confirmedBooking.bookingNumber}</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                  {confirmedBooking.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-700">
                <p><strong className="text-[#1A1A1A]">Treatment:</strong> {confirmedBooking.treatmentTitle}</p>
                <p><strong className="text-[#1A1A1A]">Dokter / Terapis:</strong> {confirmedBooking.therapist}</p>
                <p><strong className="text-[#1A1A1A]">Tanggal & Waktu:</strong> {confirmedBooking.date} • {confirmedBooking.timeSlot}</p>
                <p><strong className="text-[#1A1A1A]">Nama Pasien:</strong> {confirmedBooking.userName} ({confirmedBooking.userPhone})</p>
                <p><strong className="text-[#1A1A1A]">Lokasi Clinic:</strong> Attaya Luxe Flagship Clinic, Senayan City Mall Level 1, Jakarta</p>
                <p className="pt-2 text-[#8C6B1F] font-semibold">Total Biaya: {formatIDR(confirmedBooking.treatmentPrice)} (Pembayaran Kasir Klinik)</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-gold-gradient text-white rounded-xl font-semibold text-sm shadow-luxe hover:opacity-95 transition-all"
            >
              Selesai & Tutup
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#C5A059] uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Reservasi Klinik Estetika Attaya</span>
              </div>
              <h2 className="font-serif-luxe text-2xl font-bold text-[#1A1A1A]">
                {treatment.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Durasi {treatment.durationMinutes} Menit • Biaya {formatIDR(treatment.price)}
              </p>
            </div>

            {/* Step 1: Schedule Selection */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider border-b border-gray-100 pb-2">
                1. Pilih Tanggal & Sesi Waktu
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Pilih Tanggal Kedatangan:</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Dokter / Terapis Spesialis:</label>
                  <select
                    value={selectedTherapist}
                    onChange={(e) => setSelectedTherapist(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {therapistOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Pilih Slot Jam Konsultasi & Treatment:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-[#FAF3E0] border-[#D4AF37] text-[#8C6B1F] font-bold shadow-xs'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Patient Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider border-b border-gray-100 pb-2">
                2. Data Pasien & Kontak VIP
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Nama Lengkap Pasien:</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Nomor WhatsApp / HP:</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Alamat Email Konfirmasi:</label>
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Catatan Alergi / Keluhan Spesifik Kulit (Opsional):</label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Kulit sensitif terhadap alkohol, sedang menggunakan retinoid..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <div className="text-xs text-gray-500">
                <span>Total Biaya Klinik: </span>
                <span className="font-bold text-[#1A1A1A] text-sm">{formatIDR(treatment.price)}</span>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-gold-gradient text-white rounded-xl text-xs font-semibold shadow-luxe hover:opacity-95 transition-all"
              >
                Konfirmasi Reservasi
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
