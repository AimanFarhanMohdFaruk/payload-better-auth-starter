'use client'
import { AppWindowMac, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Container } from '@/components/layout'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetHeader,
	SheetPanel,
	SheetPopup,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

import { cn } from '@/lib/utils'

import { SignedIn, SignedOut, UserButton } from '@daveyplate/better-auth-ui'
import { AnimatePresence, motion } from 'motion/react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { AcmeLogoIcon } from '../icons'

const navigationLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/features', label: 'Features' },
	{ href: '/about', label: 'About' },
	{ href: '/blog', label: 'Blog' },
]

export default function Header() {
	const isLarge = useMediaQuery('(min-width: 64rem)')
	const pathname = usePathname()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 75)
		}
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<header
			data-theme="dark"
			{...(isScrolled && { 'data-scrolled': true })}
			className={cn(
				'bg-background [--color-popover:color-mix(in_oklch,var(--color-muted)_25%,var(--color-background))] px-4 md:px-8',
				!isLarge && 'sticky top-0 h-16 z-50',
			)}
		>
			<div
				className={cn(
					'relative',
					!isLarge &&
						'in-data-scrolled:border-b in-data-scrolled:border-foreground/5 in-data-scrolled:backdrop-blur in-data-scrolled:bg-card/50 absolute inset-x-0 top-0 z-50 h-16 px-4 md:px-8',
				)}
			>
				<Container gutter="none">
					<div className="relative flex flex-wrap items-center justify-between py-1.5 max-lg:h-16 lg:py-5">
						<div className="flex items-center justify-between gap-8 max-lg:h-14 max-lg:w-full">
							<Link href="/" aria-label="home">
								<AcmeLogoIcon aria-hidden="true" className="h-5" />
							</Link>

							<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
								<SheetTrigger
									render={
										<Button
											aria-label="Open navigation"
											className="lg:hidden"
											size="icon"
											variant="ghost"
										/>
									}
								>
									<Menu aria-hidden="true" />
								</SheetTrigger>
								<SheetPopup className="lg:hidden" side="right">
									<SheetHeader>
										<SheetTitle>Navigation</SheetTitle>
									</SheetHeader>
									<SheetPanel>
										<MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} pathname={pathname} />
									</SheetPanel>
								</SheetPopup>
							</Sheet>
						</div>

						{isLarge && (
							<motion.div
								animate={{ width: 'fit-content', gap: 8 }}
								className="bg-popover/50 ring-background/75 border-foreground/5 fixed inset-x-0 z-50 mx-auto size-fit max-w-xl rounded-xl border p-1.5 shadow-xl ring-1 inset-shadow-sm shadow-black/25 inset-shadow-white/[0.02] backdrop-blur-xl"
							>
								<div className="flex items-center">
									<AnimatePresence>
										{isScrolled && (
											<motion.div
												key="logo"
												initial={{ opacity: 0, width: 0 }}
												animate={{ opacity: 1, width: '3rem' }}
												exit={{ opacity: 0, width: 0 }}
												className="before:bg-foreground/10 before:border-background/75 relative before:absolute before:inset-y-1 before:right-2 before:w-0.5 before:rounded before:border-r"
											>
												<Link
													href="/"
													aria-label="home"
													className="hover:bg-foreground/5 flex size-7 rounded-md"
												>
													<AcmeLogoIcon aria-hidden="true" className="m-auto size-4" />
												</Link>
											</motion.div>
										)}
										<NavMenu key="nav-menu" pathname={pathname} />
										{isScrolled && (
											<motion.div
												key="sign-in-button"
												initial={{ opacity: 0, width: 0 }}
												animate={{ opacity: 1, width: 'auto' }}
												exit={{ opacity: 0, width: 0 }}
												className="h-7 overflow-hidden"
											>
												<SignedIn>
													<UserButton
														size="icon"
														variant="ghost"
														classNames={{
															trigger: {
																base: 'ml-4',
																avatar: {
																	base: 'border-foreground/10 border size-7 ring-0',
																},
															},
														}}
														additionalLinks={[
															{
																signedIn: true,
																icon: <AppWindowMac aria-hidden="true" />,
																label: 'Dashboard',
																href: '/dashboard',
															},
														]}
													/>
												</SignedIn>
												<SignedOut>
													<Button
														size="sm"
														variant="outline"
														className="border-foreground/10 ml-2 h-7 ring-0"
														render={<Link href={`/sign-in?redirectTo=${pathname}`} />}
													>
														<span>Sign In</span>
													</Button>
												</SignedOut>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</motion.div>
						)}
						<div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="flex w-full flex-col sm:flex-row sm:gap-3 md:w-fit">
								<SignedOut>
									<div className="w-full">
										<Button
											render={<Link href={`/sign-in?redirectTo=${pathname}`} />}
											size="sm"
											variant="ghost"
										>
											Sign In
										</Button>
									</div>
								</SignedOut>
								<SignedIn>
									<UserButton
										size={isLarge ? 'icon' : 'default'}
										variant="ghost"
										additionalLinks={[
											{
												signedIn: true,
												icon: <AppWindowMac aria-hidden="true" />,
												label: 'Dashboard',
												href: '/dashboard',
											},
										]}
									/>
								</SignedIn>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</header>
	)
}

const MobileMenu = ({ closeMenu, pathname }: { closeMenu: () => void; pathname: string }) => {
	return (
		<nav aria-label="Mobile navigation">
			<div className="flex flex-col gap-1">
				{navigationLinks.map((link) => {
					const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)

					return (
						<Button
							className="w-full justify-start"
							key={link.href}
							render={
								<Link
									aria-current={isActive ? 'page' : undefined}
									href={link.href}
									onClick={closeMenu}
								/>
							}
							variant={isActive ? 'secondary' : 'ghost'}
						>
							{link.label}
						</Button>
					)
				})}
			</div>
			<SignedOut>
				<Button
					className="mt-6 w-full"
					render={<Link href={`/sign-in?redirectTo=${pathname}`} onClick={closeMenu} />}
				>
					Sign In
				</Button>
			</SignedOut>
			<SignedIn>
				<div className="mt-6">
					<UserButton
						size="default"
						variant="ghost"
						additionalLinks={[
							{
								signedIn: true,
								icon: <AppWindowMac aria-hidden="true" />,
								label: 'Dashboard',
								href: '/dashboard',
							},
						]}
					/>
				</div>
			</SignedIn>
		</nav>
	)
}

const NavMenu = ({ pathname }: { pathname: string }) => {
	return (
		<nav aria-label="Primary" className="max-lg:hidden">
			<ul className="flex items-center gap-1">
				{navigationLinks.map((link) => {
					const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)

					return (
						<li key={link.href}>
							<Button
								render={<Link aria-current={isActive ? 'page' : undefined} href={link.href} />}
								size="sm"
								variant={isActive ? 'secondary' : 'ghost'}
							>
								{link.label}
							</Button>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
