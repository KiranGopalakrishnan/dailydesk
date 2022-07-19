terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 5.0"
    }
  }

  cloud {
    organization = "dailydesk"

    workspaces {
      name = "production"
    }
  }
}

variable "prefix" {
  description = "High-level name of this configuration, used as a resource name prefix."
  type        = string
  default     = "heroku"
}

variable "appname" {
  description = "Name of the app."
  type        = string
  default     = "dailydesk"
}

resource "heroku_app" "app" {
  name   = var.appname
  region = "us"
}

# Create a database, and configure the app to use it
resource "heroku_addon" "database" {
  plan   = "heroku-postgresql:hobby-dev"
  app_id = heroku_app.app.id
  config = {
    sslmode = false
  }
}

variable "app_quantity" {
  default     = 1
  description = "Number of dynos in your Heroku formation"
}

resource "heroku_build" "deploy" {
  app_id     = heroku_app.app.id
  buildpacks = ["https://github.com/heroku/heroku-buildpack-nodejs"]

  source {
    path = "../../../../dist/apps/backend"
  }
}

resource "heroku_formation" "machine_config" {
  app_id     = heroku_app.app.id
  type       = "web"
  quantity   = var.app_quantity
  size       = "Free"
  depends_on = [heroku_build.deploy]
}

