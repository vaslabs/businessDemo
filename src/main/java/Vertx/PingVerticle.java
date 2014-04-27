package Vertx;
/*
 * Copyright 2013 Red Hat, Inc.
 *
 * Red Hat licenses this file to you under the Apache License, version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License.  You may obtain a copy of the License at:
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * @author <a href="http://tfox.org">Tim Fox</a>
 */

import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;
/*
This is a simple Java verticle which receives `ping` messages on the event bus and sends back `pong` replies
 */
public class PingVerticle extends Verticle {

  public void start() {
	  
	  JsonObject obj = new JsonObject();
	  obj.putNumber("port", new Integer(8081));
	  obj.putString("host", "localhost");
	  container.deployVerticle(WebVertx.class.getCanonicalName(),obj);
	  
  }
  
  
  public static void main(String[] args){
	  String[] arr = {"run", "src/main/java/Vertx/PingVerticle.java"};
	  org.vertx.java.platform.impl.cli.Starter.main(arr);
  }
 
}
