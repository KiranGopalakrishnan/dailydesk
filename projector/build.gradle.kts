import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.5.0"
	id("io.spring.dependency-management") version "1.0.9.RELEASE"
	kotlin("jvm") version "1.5.10"
	kotlin("plugin.spring") version "1.3.61"
	id ("com.google.protobuf") version "0.8.16"
	application
}

group = "com.dailydesk.projector"
version = "0.0.1"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
}



dependencies {
	implementation(project(":protobuf"))
	implementation(project(":common-bifrost-client"))

	implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
	implementation("org.springframework.boot:spring-boot-starter-jersey")
	implementation("org.springframework.security:spring-security-crypto")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("com.google.code.gson:gson:2.8.6")
	implementation("com.auth0:java-jwt:3.10.3")
	implementation("io.jsonwebtoken:jjwt:0.7.0")
	testImplementation("org.springframework.boot:spring-boot-starter-test") {
		exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
	}
}

//tasks.register("package") {
//	//dependsOn("build")
//	exec {
//		executable("./actions/package.sh")
//	}
//}
//
//tasks.register("push") {
//    exec {
//		executable("./actions/push.sh")
//	}
//}
