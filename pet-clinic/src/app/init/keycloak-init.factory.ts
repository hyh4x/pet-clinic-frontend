import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

export function initializeKeycloak (keycloak: KeycloakService) {

    const keycloakUrl = environment.keycloakUrl;

    return() => 
        keycloak.init({
            config: {
                url: keycloakUrl+'/auth',
                realm: 'petclinic',
                clientId: 'petclinic-frontend'
            },
            initOptions: {
                checkLoginIframe: false
            }
        });
}
