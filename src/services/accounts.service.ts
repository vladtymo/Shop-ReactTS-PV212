import axios from 'axios';
import { tokenService } from './token.service';

const api = import.meta.env.VITE_ACCOUNTS_API;

export default axios.create({
    baseURL: api
});

export const accountService = {
    login(accessToken: string) {
        tokenService.save(accessToken);
    },
    logout() {
        tokenService.clear();
    },
    isAuthenticated(): boolean {
        return tokenService.get() !== null;
    }
}