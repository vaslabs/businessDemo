package Vertx;

import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.platform.Verticle;

public class WebVertx extends Verticle{

	public void start(){
		final Handler<HttpServerRequest> rootHandler = new Handler<HttpServerRequest>() {

			@Override
			public void handle(HttpServerRequest event) {
				
				String fileName = event.path();
				if(fileName.equals("/")){
					fileName="/index.html";
				}
				event.response().sendFile("web"+fileName);
			}
		};
		RouteMatcher rm = new RouteMatcher();
		rm.allWithRegEx("[/a-zA-Z._]+", rootHandler);
		System.out.println(container.config().getString("host"));
		vertx.createHttpServer().requestHandler(rm).listen(8081,"localhost");
	}
}
