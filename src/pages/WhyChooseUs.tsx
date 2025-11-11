import { motion } from "framer-motion";
import { ShieldCheck, Timer, Truck, Users } from "lucide-react";
import CountUp from "react-countup";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "Every parcel is handled with care using verified pickup and delivery partners to ensure safe transit.",
  },
  {
    icon: Timer,
    title: "Fast & On-Time",
    description:
      "Guaranteed on-time deliveries across Bangladesh with real-time tracking and instant updates.",
  },
  {
    icon: Truck,
    title: "Nationwide Coverage",
    description:
      "From city centers to rural areas — we deliver everywhere through our expanding logistics network.",
  },
  {
    icon: Users,
    title: "Trusted by 10,000+ Users",
    description:
      "Join thousands of individuals and businesses who trust ParcelXpress for their daily deliveries.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const stats = [
  { label: "Parcels Delivered", value: 50000 },
  { label: "Active Couriers", value: 1200 },
  { label: "Customer Satisfaction", value: 98, suffix: "%" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-6 md:px-12 dark:bg-[#101828] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Section Header */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold"
        >
          Why Choose <span className="text-[#009CFE]">ParcelXpress</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          We simplify parcel delivery through smart technology, dedicated
          service, and an expanding logistics ecosystem designed for speed,
          trust, and customer satisfaction.
        </motion.p>
      </div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="bg-white dark:bg-[#101828] rounded-[2px] border shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <feature.icon className="w-10 h-10 text-[#009CFE]" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Count Section */}
      <div className="mt-12 flex flex-wrap justify-center gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl font-bold text-[#009CFE]">
              <CountUp
                end={stat.value}
                duration={2.5}
                separator=","
                suffix={stat.suffix || ""}
              />
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
