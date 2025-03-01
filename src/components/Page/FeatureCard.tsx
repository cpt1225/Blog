'use client';
import { motion } from "framer-motion";
import { Feature } from "@/types";

const FeatureCard = ({ feature,index }:{index:number,feature:Feature}) => {
  return (
    <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-lg border border-gray-200 p-8 "
              >
                <div className="absolute -top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 ">{feature.name}</h3>
                <p className="mt-2 text-gray-600 ">{feature.description}</p>
              </motion.div>
  )
}

export default FeatureCard