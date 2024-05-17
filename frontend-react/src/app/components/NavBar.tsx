"use client"
import React, {useEffect, useState} from "react";
import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {getUser, verifySession} from "@/app/lib/dal";
import {User} from "@/app/models/user";

export default function AppNavbar() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        verifySession().then(session => {
            if (session) {
                getUser().then(fetchedUser => {
                    setUser(fetchedUser);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return null; // or a loading indicator
    }

    return (
        <Navbar position="static" className="py-2">
            <NavbarBrand>
                <p className="px-4 font-bold text-2xl text-inherit">My3il</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/timetable">
                        Emploi du temps
                    </Link>
                </NavbarItem>
                {user && (
                    <NavbarItem>
                        <Link color="foreground" href="/users">
                            {user.role === 'ADMIN' ? 'Utilisateurs' : 'Profile'}
                        </Link>
                    </NavbarItem>
                )}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="/logout" variant="flat">
                        Déconnexion
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}