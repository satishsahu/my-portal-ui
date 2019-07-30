import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Account {
  "id": number,
  "userName": string,
  "myBill": {
    "billDate": string,
    "billNumber": string,
    "dueDate": string,
    "endDate": string,
    "id": number,
    "monthCharge": string,
    "startDate": string
  },
  "myPhone": string,
  "myPlan": {
    "allPlans": [
      {
        "id": number,
        "myPlan": any,
        "name": string,
        "packs": any
      }
    ],
    "id": number,
    "name": string
  },
  "myUsage": {
    "amount": number,
    "availInternet": number,
    "dataUnit": string,
    "id": number,
    "internetQuota": number,
    "smsQuota": number,
    "usedInternet": number,
    "usedSMS": number
  }
}
