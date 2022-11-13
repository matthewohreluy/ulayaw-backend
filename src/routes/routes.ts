import { Router } from 'express';
import FeedRoutes from './feed.route';
import AuthRoutes from './auth.route';
import VillaRoutes from './villa.route';
import BookingRoutes from './booking.route';
import UserRoutes from './user.route';
import MomentRoutes from './moment.route';
import AdminRoutes from './admin.route';
import ApplicationRoutes from './application.route';
import WebhookRoutes from './webhook.route';

export const routes: [string, Router][] = [
    ['/feed',FeedRoutes],
    ['/auth', AuthRoutes],
    ['/villa',VillaRoutes],
    ['/booking',BookingRoutes],
    ['/user', UserRoutes],
    ['/moment', MomentRoutes],
    ['/admin', AdminRoutes],
    ['/application', ApplicationRoutes],
    ['/webhook', WebhookRoutes],
]