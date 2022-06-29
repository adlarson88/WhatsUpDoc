package com.WhatsUpDoc.PhDTracker.Auth;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;

import static org.springframework.security.oauth2.core.OAuth2TokenIntrospectionClaimNames.CLIENT_ID;

public class VerifyID {

/*
*TODO:
* client_ID may be incorrect and use alternate spring endpoint import
* sample code copied from google https://developers.google.com/identity/sign-in/web/backend-auth
*/


//    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
//            // Specify the CLIENT_ID of the app that accesses the backend:
//            .setAudience(Collections.singletonList(CLIENT_ID))
//            // Or, if multiple clients access the backend:
//            //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
//            .build();
//
//// (Receive idTokenString by HTTPS POST)
//
//    GoogleIdToken idToken = verifier.verify(idTokenString);
//    if (idToken != null) {
//        Payload payload = idToken.getPayload();
//
//        // Print user identifier
//        String userId = payload.getSubject();
//        System.out.println("User ID: " + userId);
//
//        // Get profile information from payload
//        String email = payload.getEmail();
//        boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
//        String name = (String) payload.get("name");
//        String pictureUrl = (String) payload.get("picture");
//        String locale = (String) payload.get("locale");
//        String familyName = (String) payload.get("family_name");
//        String givenName = (String) payload.get("given_name");
//
//        // Use or store profile information
//        // ...
//
//    } else {
//        System.out.println("Invalid ID token.");
//    }

}
