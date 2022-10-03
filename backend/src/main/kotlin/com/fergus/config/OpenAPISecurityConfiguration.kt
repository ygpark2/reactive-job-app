package com.fergus.config

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Contact
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.info.License
import io.swagger.v3.oas.annotations.servers.Server
import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.security.SecurityRequirement
import io.swagger.v3.oas.models.security.SecurityScheme
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
@OpenAPIDefinition(
    info = Info(
        title = "Reactive kotlin with MongoDB For Fergus Job Application",
        version = "0.0.1",
        contact = Contact(
            name = "Young Gyu Park", email = "ygpark2@gmail.com", url = "http://github.com/ygpark2"
        ),
        license = License(
            name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
        ),
        termsOfService = "terms of service",
        description = "Fergus Webflux Job application"
    ),
    servers = [
        Server(
            url = "http://192.168.1.192:8090",
            description = "Dev"
        ),
        Server(
            url = "http://localhost:8090",
            description = "Test"
        )
    ]
)
class OpenAPISecurityConfiguration {

    @Bean
    fun customizeOpenAPI(): OpenAPI? {
        val securitySchemeName = "bearerAuth"
        return OpenAPI()
            .addSecurityItem(
                SecurityRequirement()
                    .addList(securitySchemeName)
            )
            .components(
                Components()
                    .addSecuritySchemes(
                        securitySchemeName, SecurityScheme()
                            .name(securitySchemeName)
                            .type(SecurityScheme.Type.HTTP)
                            .scheme("bearer")
                            .bearerFormat("JWT")
                    )
            )
    }
}