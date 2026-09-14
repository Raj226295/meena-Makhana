import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const src = join(process.cwd(), 'src')
const cssOrder = [
  'index.css', 'Footer.css', 'DeliveryLocation.css', 'StoreNavbar.css',
  'ProductsPage.css', 'LoginPage.css', 'SignupPage.css', 'ContactPage.css',
  'AboutPage.css', 'ImpactModal.css', 'App.css', 'Nav.css', 'Background.css',
  'Reference.css', 'Exact.css', 'Navbar.css', 'Botanical.css',
  'ProductCard.css', 'Typography.css', 'ReferenceNavbar.css',
]
const banner = `/* Tailwind CSS entry point.
 * Existing declarations are kept in their original cascade order inside
 * Tailwind's components layer so the migration is visually lossless. */
@tailwind components;
@tailwind utilities;

@layer components {
`
const combined = cssOrder.map(file => {
  const css = readFileSync(join(src, file), 'utf8').trim()
  return `\n/* ${file} */\n${css}\n`
}).join('')
writeFileSync(join(src, 'tailwind.css'), `${banner}${combined}}\n`)
