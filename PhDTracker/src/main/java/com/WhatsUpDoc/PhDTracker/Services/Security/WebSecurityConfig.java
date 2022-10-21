package com.WhatsUpDoc.PhDTracker.Services.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


// WebSecurityConfigurerAdapter is deprecated
// Alternative extension class probably exists - stretch goal if time permits
// after everything else is working
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // temp disabled, may last into "production"
        // CSRF blocks all modifying requests by default?
        http.csrf().disable();
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        // @formatter:off
//        http.authorizeRequests(a -> a
//                .antMatchers("/", "/error", "/webjars/**").permitAll()
//                .anyRequest().authenticated()
//                )
//                .logout(l -> l
//                        .logoutSuccessUrl("/").permitAll()
//                )
//                .csrf(c -> c
//                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                )
//                .exceptionHandling(e -> e
//                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
//                )
//                .oauth2Login();
//        // @formatter:on
//    }
}
