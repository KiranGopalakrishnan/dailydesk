output "app_url" {
  value       = heroku_app.app.web_url
  description = "Application URL"
}
