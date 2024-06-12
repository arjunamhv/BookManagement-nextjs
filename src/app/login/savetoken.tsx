'use server';
import { cookies } from 'next/headers'

export default async function saveToken(token: any) {
    cookies().set('token', token);
}
