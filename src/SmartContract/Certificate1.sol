pragma solidity ^0.8.1;

contract map_HackVGEC {
    struct events {
        string event_name;
        string[] verified;
    }

    mapping(string => events[]) public record; // organization -> organization record
    mapping(int256 => string) public key_records; // total organization // organization record
    int256 public counter_for_key = 0;
    int256 public event_found=0;
    function get_record_proper(string memory organization, string memory _event)
        public
        view
        returns (string[] memory)
    {
        events[] memory organization_events = record[organization];

        uint256 count = 0;
        string[] memory verified_certificates;
        for (uint256 i = 0; i < organization_events.length; i = i + 1) {
            verified_certificates = new string[](organization_events[i].verified.length);
            if (
                keccak256(abi.encodePacked(organization_events[i].event_name)) ==
                keccak256(abi.encodePacked(_event))
            ) {
                verified_certificates = organization_events[i].verified;
                break;
            }
        }
        return verified_certificates;
    }

    function set_record(
        string memory organization,
        string memory _eventName,
        string[] memory certificates
    ) public {
        bool record1 = get_key_status(organization); // check for organization
        if (record1 == true) { // if organization found
            events[] memory u = record[organization];
            events memory u_new;
            u_new.event_name = _eventName;
            // find for event name
            for (uint256 i = 0; i < u.length; i = i + 1) { 
                //if event named found
                if (
                    keccak256(abi.encodePacked(u[i].event_name)) ==
                    keccak256(abi.encodePacked(_eventName))
                ) {
                    for (uint256 j = 0; j < certificates.length; j = j + 1) {
                        record[organization][i].verified.push(certificates[j]);
                    }
                    break;
                }
                // if event named not found
                else{
                    events memory ub;
                    ub.event_name = _eventName;
                    ub.verified = new string[](certificates.length);
                    for (uint256 k = 0; k < certificates.length; k = k + 1) {
                        ub.verified[k] = certificates[k];
                    }  
                    record[organization].push(ub);
                }
            }
        } else {  // if organization not found
            events memory ub;
            ub.event_name = _eventName;
            ub.verified = new string[](certificates.length);
            for (uint256 k = 0; k < certificates.length; k = k + 1) {
                ub.verified[k] = certificates[k];
            }
            record[organization].push(ub);
            key_records[counter_for_key] = organization;
            counter_for_key = counter_for_key + 1;
        }
    }

    function get_key_status(string memory organization)
        public
        view
        returns (bool)
    {
        bool key_exits = false;

        // check if organization is already exist
        for (int256 i = 0; i < counter_for_key; i = i + 1) {
            if (
                keccak256(abi.encodePacked(key_records[i])) ==
                keccak256(abi.encodePacked(organization))
            ) {
                key_exits=true;
                break;
            }
        }
        if (key_exits == true) {
            return true;
        } else {
            return false;
        }
    }
    function is_cerificate_verified(string memory organization,string memory _event,string memory hash) public view returns(bool){
        events[] memory data=record[organization]; // get organization 
        bool found=false;

        // get certificates for given event
        for(uint i=0;i<data.length;i=i+1){
            events memory temp=data[i]; // certificates

            // event found
            if(keccak256(abi.encodePacked(data[i].event_name)) ==
                keccak256(abi.encodePacked(_event))
                ){
                   // search for certificate
                    for(uint j=0;j<temp.verified.length;j=j+1){
                        // certificate found
                        if(
                             keccak256(abi.encodePacked(temp.verified[j])) ==
                        keccak256(abi.encodePacked(hash))
                        ){
                            found=true;
                            break;
                        }
                    }
                    if(found==true){
                        break;
                    }
                }
                
        }
        return found;
    }
}
