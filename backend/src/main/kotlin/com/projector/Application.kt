package com.projector

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ProjectorApplication

fun main(args: Array<String>) {
	runApplication<ProjectorApplication>(*args)
}