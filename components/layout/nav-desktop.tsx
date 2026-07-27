"use client";

import { NavDropdown } from "@/components/layout/nav-dropdown";
import { NavLink } from "@/components/layout/nav-link";
import { navItems } from "@/lib/data/nav";

/**
 * Lista do nav desktop.
 *
 * Vive inteiramente no cliente e importa `navItems` diretamente: os itens
 * carregam componentes de ícone do lucide, que não são serializáveis através
 * da fronteira server → client.
 */
export function NavDesktop() {
  return (
    <nav
      aria-label="Navegação principal"
      className="hidden items-center gap-1 md:flex"
    >
      {navItems.map((item) =>
        item.children ? (
          <NavDropdown
            key={item.href}
            item={{ ...item, children: item.children }}
          />
        ) : (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ),
      )}
    </nav>
  );
}
