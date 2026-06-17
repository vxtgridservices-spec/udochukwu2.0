import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

export default function AfricaSection() {
  const regions = ["Africa", "Ghana", "Kenya", "South Africa", "Uganda", "Rwanda", "Tanzania", "Zambia", "Botswana", "Namibia", "Egypt", "Morocco"];

  return (
    <section className="py-20 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium">Building The Next Generation of African Businesses</h2>
            <p className="mt-6 text-slate-400 max-w-2xl mx-auto">I partner with ambitious businesses across the continent, combining global design quality with a deep understanding of the African market.</p>
            
            <div className="mt-16 flex flex-wrap justify-center gap-4">
                {regions.map(region => (
                    <motion.div 
                        key={region}
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-full text-sm hover:border-blue-600 transition-colors"
                    >
                        {region}
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 inline-flex items-center gap-3 text-sm text-blue-400">
                <Globe className="w-5 h-5" />
                <span>Serving Clients Across Africa | Remote-first collaboration | Global quality</span>
            </div>
        </div>
    </section>
  );
}
