package com.WhatsUpDoc.PhDTracker.Services.Security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


// WebSecurityConfigurerAdapter is deprecated
// Alternative extension class probably exists - stretch goal if time permits
// after everything else is working
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // temp disabled, may last into "production"
        // CSRF blocks all modifying requests by default?
        http.csrf().disable();
    }
}
