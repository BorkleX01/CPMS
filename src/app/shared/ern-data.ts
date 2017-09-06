//import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class ERNData {//implements InMemoryDbService {
  createDb() {
    let heroes = 
      [
    {
      "ErnNumber": "ERN006",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Maritime Container Services",
      "FacilityId": "MCS",
      "QuantityOrdered": 0,
      "QuantityReleased": 0,
      "QuantityPending": 0,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN1",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Customer",
      "FacilityId": "MCS",
      "QuantityOrdered": 5,
      "QuantityReleased": 1,
      "QuantityPending": 4,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN17",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Customer",
      "FacilityId": "MCS",
      "QuantityOrdered": 0,
      "QuantityReleased": 0,
      "QuantityPending": 0,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN19",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Maritime Container Services",
      "FacilityId": "MCS",
      "QuantityOrdered": 3,
      "QuantityReleased": 0,
      "QuantityPending": 3,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN2",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Maritime Container Services",
      "FacilityId": "MCS",
      "QuantityOrdered": 0,
      "QuantityReleased": 0,
      "QuantityPending": 0,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN33",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Maritime Container Services",
      "FacilityId": "MCS",
      "QuantityOrdered": 0,
      "QuantityReleased": 0,
      "QuantityPending": 0,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN4",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Maritime Container Services",
      "FacilityId": "MCS",
      "QuantityOrdered": 0,
      "QuantityReleased": 0,
      "QuantityPending": 0,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN6",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Maritime Container Services",
      "FacilityId": "MCS",
      "QuantityOrdered": 5,
      "QuantityReleased": 0,
      "QuantityPending": 5,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN7",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Maritime Container Services",
      "FacilityId": "MCS",
      "QuantityOrdered": 0,
      "QuantityReleased": 0,
      "QuantityPending": 0,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN81",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Maritime Container Services",
      "FacilityId": "MCS",
      "QuantityOrdered": 1,
      "QuantityReleased": 0,
      "QuantityPending": 1,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    },
    {
      "ErnNumber": "ERN88",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Customer",
      "FacilityId": "MCS",
      "QuantityOrdered": 0,
      "QuantityReleased": 0,
      "QuantityPending": 0,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "CLOSE"
    },
    {
      "ErnNumber": "ERN9",
      "ShippingLineCode": "Sh_code1",
      "ShippingLineName": "Maritime Container Services",
      "FacilityId": "MCS",
      "QuantityOrdered": 0,
      "QuantityReleased": 0,
      "QuantityPending": 0,
      "ExpectedReleaseDate": "0001-01-01T00:00:00",
      "LastReleaseDate": "0001-01-01T00:00:00",
      "ERNStatus": "OPEN"
    }
  ]
    ;
    return {heroes};
  }
}