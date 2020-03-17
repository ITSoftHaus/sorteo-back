import { Express, Router } from 'express';

import IPathRoute from '../core/IPathRoute';
import BackendRoutes from '../backend/routes/BackendRoutes';
import FrontendRoutes from '../frontend/routes/FrontendRoutes';

export default class AppRoutes {
    
    /**
     * Lista de Roteadores
     */
    private routeList: IPathRoute[] = [
        { path: '/backend', router: BackendRoutes },
        { path: '/frontend', router: FrontendRoutes }
    ];

    /**
     * Conectando Roteadores
     * @param expApp 
     */
    mount(expApp: Express): void {
        this.routeList.forEach((item) => {
            expApp.use(
                item.path,
                item.router.createRouter(Router)
            );
        });
    }
}