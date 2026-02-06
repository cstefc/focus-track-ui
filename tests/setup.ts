import "@testing-library/jest-dom/vitest";

import {vi} from 'vitest';
import {User} from "firebase/auth";

vi.stubEnv("VITE_API_URL", "/api")

export const mockNavigate = vi.fn();
export const mockChangeLanguage = vi.fn();
export const test_user = {
    displayName: "test user",
    photoURL: "https://example.com/",
    getIdToken: async () => 'mock-token',
} as User;

export const fakeAuth = (() => {
    let callback: ((user: any) => void) | null = null;

    return {
        currentUser: null as User | null,
        onAuthStateChanged: (cb: (user: any) => void) => {
            callback = cb;
            return () => {
            };
        },
        triggerUser: (user: any) => {
            if (callback) callback(user);
            fakeAuth.currentUser = user;
        },
    };
})();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate, // replace navigate with spy
    };
});

// i18n mock
vi.mock('react-i18next', async () => {
    return {
        useTranslation: () => ({
            t: (key: string) => key, // returns key directly
            i18n: {
                changeLanguage: (lang: string) => mockChangeLanguage(lang),
                resolvedLanguage: "en",
                options: {
                    resources: {
                        en: {},
                        nl: {}
                    }
                },
            },
        }),
    }
});

// Firebase Auth mock
vi.mock('firebase/auth', async () => {
    const actual = await vi.importActual('firebase/auth');
    return {
        ...actual,
        getAuth: () => fakeAuth,
        GoogleAuthProvider: vi.fn().mockImplementation(function () {
            return {};
        }),
        signInWithPopup: vi.fn().mockResolvedValue(test_user),
        signOut: vi.fn().mockImplementation(async () => {
            fakeAuth.triggerUser(null);
        }),
    };
});