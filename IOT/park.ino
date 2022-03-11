#include <SPI.h>
#include <Ethernet.h>

const int trigPin = 3;
const int echoPin = 2;
long duration;
int distance;

byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(192, 168, 1, 177);
String readString = "";

EthernetServer server(80);

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  Serial.begin(9600);
  while (!Serial) {
    ;
  }
  Ethernet.begin(mac, ip);
  if (Ethernet.hardwareStatus() == EthernetNoHardware) {
    while (true) {
      delay(1);
    }
  }
  if (Ethernet.linkStatus() == LinkOFF) {
  }
  server.begin();
}


void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration*0.034/2;
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
 
  EthernetClient client = server.available();
  if (client) {
    boolean currentLineIsBlank = true;
 
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
       
        readString += c;

        String park = "used"; 
      
        if ( distance >=  50 ){
          park = "empty";
        }
       
        if (c == '\n' && currentLineIsBlank) {
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: application/json");
          client.println("Access-Control-Allow-Origin: *");
          client.println("Connection: close");
          client.println();
          client.println("{\"status\":\"OK\", \"park\":\""+ park +"\"}");
          break;
        }
        if (c == '\n') {
          currentLineIsBlank = true;
        } else if (c != '\r') {
          currentLineIsBlank = false;
        }
      }
    }
    delay(1);
    client.stop();

    readString = "";
   
  }
}
