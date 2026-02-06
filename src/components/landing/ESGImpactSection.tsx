import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ShieldCheck, Heart, Leaf, TrendingUp } from 'lucide-react';

const impactData = [
    { month: 'Ene', hours: 1200, impact: 850 },
    { month: 'Feb', hours: 1800, impact: 1400 },
    { month: 'Mar', hours: 2200, impact: 1900 },
    { month: 'Abr', hours: 2800, impact: 2300 },
    { month: 'May', hours: 3500, impact: 2900 },
    { month: 'Jun', hours: 4200, impact: 3600 },
];

export function ESGImpactSection() {
    return (
        <section className="py-20 md:py-32 bg-gray-50 border-t border-black/5 overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

                <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">

                    {/* Text Content */}
                    <div className="space-y-8">


                        <h2 className="text-4xl md:text-6xl font-display font-bold text-black tracking-tight leading-[1.1]">
                            Transformando <br />
                            <span className="text-green-600">contratación</span> en <br />
                            oportunidad social.
                        </h2>

                        <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-xl">
                            Cada hora trabajada a través de Serbis genera un impacto directo en comunidades vulnerables.
                            Conectamos su necesidad operativa con talento formado por fundaciones líderes,
                            cerrando la brecha de oportunidad laboral.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 pt-4">
                            <div className="p-6 bg-white rounded-2xl border border-black/5 shadow-sm">
                                <ShieldCheck className="w-8 h-8 text-accent mb-4" />
                                <h4 className="font-bold text-lg mb-2">Certificado ESG</h4>
                                <p className="text-sm text-gray-500">
                                    Recibí un certificado mensual detallando las horas de impacto generadas por tu empresa para tus reportes de sustentabilidad.
                                </p>
                            </div>
                            <div className="p-6 bg-white rounded-2xl border border-black/5 shadow-sm">
                                <Heart className="w-8 h-8 text-green-600 mb-4" />
                                <h4 className="font-bold text-lg mb-2">Inclusión Real</h4>
                                <p className="text-sm text-gray-500">
                                    El 100% de nuestros trabajadores provienen de programas de formación e inserción laboral de ONGs aliadas.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Charts Visuals */}
                    <div className="relative">
                        {/* Decorative Elements */}
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />

                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-black/5 relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="font-bold text-xl md:text-2xl">Horas de Impacto</h3>
                                    <p className="text-sm text-gray-400">Crecimiento acumulado (2025)</p>
                                </div>
                                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                                    <TrendingUp size={14} /> +45% mo/mo
                                </div>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={impactData}>
                                        <defs>
                                            <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#9CA3AF' }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#9CA3AF' }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: '#000', fontWeight: 'bold' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="hours"
                                            stroke="#000"
                                            strokeWidth={2}
                                            fill="transparent"
                                            name="Total Horas"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="impact"
                                            stroke="#16a34a"
                                            strokeWidth={3}
                                            fill="url(#colorImpact)"
                                            name="Horas Impacto"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-6">
                                <span>Total Horas Generadas</span>
                                <span className="font-mono text-2xl font-bold text-black">15,900 h</span>
                            </div>
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -bottom-12 -left-8 md:-left-12 bg-black text-white p-6 rounded-2xl shadow-2xl z-20 max-w-[200px] hidden md:block">
                            <div className="flex items-center gap-3 mb-2">
                                <Leaf className="w-5 h-5 text-green-400" />
                                <span className="text-xs font-bold uppercase tracking-wider text-white/60">Huella Social</span>
                            </div>
                            <div className="text-3xl font-display font-bold mb-1">
                                450+
                            </div>
                            <div className="text-xs text-white/60 leading-tight">
                                Familias impactadas positivamente este año.
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
