'use client';

import { AnimatePresence, motion } from "framer-motion";

interface ElementFadeInProps {
	children: React.ReactNode;
	index?: number;
}

const ElementFadeIn = ({ children, index }: ElementFadeInProps) => {
		return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.4, delay: index ? index * 0.08 : 0 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

export { AnimatePresence as ElementFadeInWrapper };
export default ElementFadeIn;