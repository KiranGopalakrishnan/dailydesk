variable "vpc_subnet_module" {
  type = object({
    name = string
    cidr = string
    azs = list(string)
    private_subnets = list(string)
    public_subnets = list(string)
    enable_nat_gateway = bool
    enable_vpn_gateway = bool
  })
}

output "VMCount" {
  value = var.vpc_subnet_module
}

