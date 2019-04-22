package com.telegroupltd.planning_vacation_app.session;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/hub/*")
public class HubAccessFilter implements Filter {

    private WebApplicationContext springContext;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        springContext = WebApplicationContextUtils.getWebApplicationContext(filterConfig.getServletContext());
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        UserBean userBean = (UserBean) springContext.getBean("userBean");

        filterChain.doFilter(servletRequest, servletResponse); // Normal
        //response.sendError(HttpStatus.FORBIDDEN.value());
        //response.sendError(HttpStatus.UNAUTHORIZED.value());
    }

    @Override
    public void destroy() {

    }
}
