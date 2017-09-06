export class ApiSettings {

	/*Reference Data*/
	public static get REFERENCE_DATA_URL(): string { return 'CPMSGW/services/CPMSProxy/v1/ReferenceData'; }

	/*Booking APIs*/
	public static get SEARCH_BOOKING_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/Appointment/Search'; }
	public static get BOOKING_DETAIL_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/Appointment/'; }
	public static get BOOKING_GATE_IN(): string { return 'CPMSGW/services/CPMSBooking/v1/Appointment/CompleteJob/DropOff'; } 
	public static get BOOKING_GATE_OUT(): string { return 'CPMSGW/services/CPMSBooking/v1/Appointment/CompleteJob/PickUp'; } 
	

	/*ERN APIs*/
	public static get ERN_GET_ALL_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/GetAll/'; }
	public static get SEARCH_ERN_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/Search'; }
	public static get SEARCH_ERN_HISTORY_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/SearchArchive';}
	public static get CREATE_ERN_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/'; }
	public static get ERN_DETAIL_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/'; }
	public static get UPDATE_ERN_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN'; } 
	public static get DELETE_ERN_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/'; } 


	/*Inventory APIs*/
	public static get INVENTORY_GET_ALL_URL(): string { return 'CPMSGW/services/CPMSYard/v1/Container'; } 
	public static get INVENTORY_SEARCH(): string { return 'CPMSGW/services/CPMSYard/v1/Container/Search'; }
	public static get SEARCH_INVENTORY_URL(): string { return 'CPMSGW/services/CPMSYard/v1/Container/Search/';}
	public static get INVENTORY_HISTORY_SEARCH(): string { return 'CPMSGW/services/CPMSYard/v1/Container/SearchArchive'; }
	public static get YARD_GATE_IN(): string { return 'CPMSGW/services/CPMSYard/v1/GateIn'; }
	public static get CONTAINER_DETAIL_URL(): string { return 'CPMSGW/services/CPMSYard/v1/Container/'; }
	public static get CONTAINER_HOLD_RELEASE_URL(): string { return 'CPMSGW/services/CPMSYard/v1/Container/HoldStatus'; }
	public static get GET_AVAILABLE_URL(): string { return 'CPMSGW/services/CPMSYard/v1/Container/Search/AvailableForGateOut/';}
	public static get MOVEMENT_LOG_URL(): string { return 'CPMSGW/services/CPMSYard/v1/Container/Log/Search/';}
	public static get EDIT_INVENTORY_URL(): string { return 'CPMSGW/services/CPMSYard/v1/Container/'; }


	

	/*Redirections APIs*/
	public static get ACTIVE_REDIRECTIONS_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility'; } 
	public static get REDIRECTION_DETAIL_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/'; } 
	public static get INACTIVE_REDIRECTIONS_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/SearchArchive'; } 
	public static get DELETE_REDIRECTION_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/'; } 
	public static get CREATE_REDIRECTION_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/'; } 
	public static get UPDATE_REDIRECTION_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/'; } 


	/*Pre-Gate APIs*/
	public static get PREGATE_GET_ALL_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/PreGate'; }
	public static get CREATE_PREGATE_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/PreGate'; }
	public static get PREGATE_DETAIL_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/PreGate/'; }
	public static get EDIT_PREGATE_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/PreGate/'; }
	public static get PREGATE_HISTORY_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/PreGate/SearchArchive'; }
	public static get DELETE_PREGATE_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/PreGate/'; }


	/*Dashboard APIs*/
	public static get BOOKING_BY_SHIPPING_LINE_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/Reporting/BookingsByShippingLine'; }
	
}
