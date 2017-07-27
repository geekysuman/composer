import { NgModule }             from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NoContentComponent } from './no-content';
import ActivateGuard from './guards/activate.guard';
import { HomeComponent } from './home/home.component';


export const ROUTES: Routes = [
    {   path: 'editor', 
        loadChildren: 'app/editor/editor.module#EditorModule', 
        canActivate: [ActivateGuard]
    },
    {path: 'test', loadChildren: 'app/test/test.module#TestModule'},
    {path: 'home', component: HomeComponent},
    {path: 'identity', loadChildren: 'app/identity/identity.module#IdentityModule'},
    {path: 'profile', loadChildren: 'app/connection-profile/connection-profile.module#ConnectionProfileModule'},
    {path: '', redirectTo: 'editor', pathMatch: 'full'},
    // {path: '/playground', redirectTo: 'editor', pathMatch: 'full'},
    {path: '**', component: NoContentComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, {useHash: false, preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
