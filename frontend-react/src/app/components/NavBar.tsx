import React from "react";
import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";


export default function AppNavbar() {
    const isLoggedIn = true; // Replace this with actual authentication status

    return (
        <Navbar position="static">
            <NavbarBrand>
                <p className="font-bold text-inherit">My3il</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/timetable">
                        Emploi du temps
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/users">
                        Utilisateurs
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {isLoggedIn ? (
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/logout" variant="flat">
                            Déconnexion
                        </Button>
                    </NavbarItem>
                ) : (
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/login" variant="flat">
                            Connexion
                        </Button>
                        <Button as={Link} color="primary" href="/register" variant="flat">
                            Inscription
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar>
    );
}