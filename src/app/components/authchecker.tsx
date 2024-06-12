'use server';
import { cookies } from 'next/headers'

export default async function authChecker() {
    const token = cookies().get('token');
    if (token) {
        return true;
    } else {
        return false;
    }
}
