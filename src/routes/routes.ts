import { Router } from 'express';
import FeedRoutes from './feed.route';
import AuthRoutes from './auth.route';
import VillaRoutes from './villa.route';

export const routes: [string, Router][] = [
    ['/feed',FeedRoutes],
    ['/auth', AuthRoutes],
    ['/villa',VillaRoutes]
]