terraform {
  #backend "pg" {}

  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 5.0"
    }
  }
}

variable "prefix" {
  description = "High-level name of this configuration, used as a resource name prefix"
  type        = string
  default     = "heroku"
}

variable "appname" {
  description = "Name of the app"
  type        = string
  default     = "dailydesk"
}

resource "heroku_app" "app" {
  name   = var.appname
  region = "us"
}

# Create a database, and configure the app to use it
resource "heroku_addon" "database" {
  app_id = heroku_app.app.id
  plan   = "heroku-postgresql:hobby-basic"
  app    = var.appname
}

variable "app_quantity" {
  default     = 1
  description = "Number of dynos in your Heroku formation"
}

resource "heroku_build" "deploy" {
  app = var.appname

  source {
    path = "./dist/apps/backend"
  }
}

resource "heroku_formation" "machine_config" {
  app        = heroku_app.app.id
  type       = "web"
  quantity   = var.app_quantity
  size       = "Standard-1x"
  depends_on = [heroku_build.deploy]
}

