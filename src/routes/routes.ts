import { Router } from 'express';
import FeedRoutes from './feed.route';
import AuthRoutes from './auth.route';
import VillaRoutes from './villa.route';
import BookingRoutes from './booking.route';
import UserRoutes from './user.route';
import MomentRoutes from './moment.route';

export const routes: [string, Router][] = [
    ['/feed',FeedRoutes],
    ['/auth', AuthRoutes],
    ['/villa',VillaRoutes],
    ['/booking',BookingRoutes],
    ['/user', UserRoutes],
    ['/moment', MomentRoutes]
]