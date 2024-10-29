import { motion } from "framer-motion"
import Link from "next/link"

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-0 mb-4 flex w-full justify-center text-[rgb(204,204,204)]"
    >
      <p>
        <span>© 2024</span>
        <Link href="https://github.com/liwenka1" target="_blank" className="pl-2 hover:underline">
          文凯@liwenka1
        </Link>
        <span className="px-2">|</span>
        <Link href="https://github.com/liwenka1/next-home-v2" target="_blank" className="hover:underline">
          项目地址
        </Link>
      </p>
    </motion.div>
  )
}

export default Footer
