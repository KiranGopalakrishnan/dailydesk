package com.dailydesk.common.authentication

import com.dailydesk.common.id.ShortId

data class Company(
    val id: ShortId,
    val name: String,
    val domain: String,
    val status: String
){
    companion object {
        //Any since SecurityContext().principal is of type Any
        fun transform(company: Any):Company {
            val companyObj = company as BifrostOuterClass.Company
            return Company(
                id = ShortId(companyObj.id),
                name = companyObj.name,
                domain = companyObj.domain,
                status = companyObj.status
            )
        }
    }
}
