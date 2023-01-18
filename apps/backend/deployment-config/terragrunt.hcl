# Indicate where to source the terraform module from.
# The URL used here is a shorthand for
# "tfr://registry.terraform.io/terraform-aws-modules/vpc/aws?version=3.5.0".
# Note the extra `/` after the protocol is required for the shorthand
# notation.
terraform {
  source = "tfr:///terraform-aws-modules/vpc/aws?version=3.5.0"
}

generate "remote_state" {
  path      = "backend.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "dailydesk"
    workspaces {
      name = "Production-CD"
    }
  }
}
EOF
}

# Indicate what region to deploy the resources into
generate "provider" {
  path = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
provider "aws" {
  region = "us-east-1"
  assume_role {
    role_arn = "arn:aws:iam::349142834852:role/GithubAction"
  }
}
EOF
}

# Indicate the input values to use for the variables of the module.
inputs = {
  vpc_subnet_module = {
    name = "dailydesk-vpc"
    cidr = "10.0.0.0/16"

    azs             = ["us-east-1a"]
    private_subnets = ["10.0.1.0/24"]
    public_subnets  = ["10.0.101.0/24"]

    enable_nat_gateway = true
    enable_vpn_gateway = false
  }
}
