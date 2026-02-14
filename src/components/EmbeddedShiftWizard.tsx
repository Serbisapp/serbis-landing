import React, { useState } from 'react';
import { ArrowRight, Sparkles, MapPin, Calendar, Clock, Briefcase } from 'lucide-react';
import type { Shift } from '../types';

interface EmbeddedShiftWizardProps {
    onComplete: (data: Partial<Shift>) => void;
}

export function EmbeddedShiftWizard({ onComplete }: EmbeddedShiftWizardProps) {
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        // Basic validation
        if (!description.trim()) return;

        onComplete({
            description,
            role: 'Personal Operativo', // Default hardcoded
            // Defaults for other fields can be handled by App.tsx or here
            location: 'A definir',
            date: 'A coordinar',
            time: '09:00',
            durationHours: 4,
            hourlyRate: 8500,
            quantity: 1,
        });
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 w-full max-w-md animate-in slide-in-from-bottom-8 duration-700 delay-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-display leading-tight">
                        ¿Qué necesitás hoy?
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                        Describí tu necesidad y accedé a nuestra red de talento.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">



                {/* Description Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Descripción de la Tarea
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ej: Carga y descarga."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 h-32 resize-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-gray-900 placeholder:text-gray-400 text-sm leading-relaxed transition-all"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!description.trim()}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    Continuar <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>

                <p className="text-center text-xs text-gray-400">

                </p>

            </div>
        </div>
    );
}
