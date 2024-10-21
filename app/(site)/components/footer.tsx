import { motion } from "framer-motion"

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="z-10 mt-auto pt-8"
    >
      <nav className="flex justify-center space-x-6">
        {[
          { name: "Blog", href: "/blog" },
          { name: "Nav", href: "/nav" },
          { name: "Me", href: "/me" }
        ].map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-lg font-medium text-white transition-colors duration-200 hover:text-gray-200"
          >
            {link.name}
          </a>
        ))}
      </nav>
    </motion.div>
  )
}

export default Footer
