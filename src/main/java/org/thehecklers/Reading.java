package org.thehecklers;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.stereotype.Component;

@Component
@Entity
public class Reading {
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private int id;
	private int node;
	private double hum;
	private double temp;
	private double volts;
	private double lum;
	private int windDir;
	private double windSpeed;
	private double rainfall;
	private long pressure;
	private int status;
	
	protected Reading() {}
	
	public Reading(int id, int node, double hum, double temp, double volts, double lum, int windDir, double windSpeed,
			double rainfall, long pressure, int status) {
		super();
		this.id = id;
		this.node = node;
		this.hum = hum;
		this.temp = temp;
		this.volts = volts;
		this.lum = lum;
		this.windDir = windDir;
		this.windSpeed = windSpeed;
		this.rainfall = rainfall;
		this.pressure = pressure;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getNode() {
		return node;
	}

	public void setNode(int node) {
		this.node = node;
	}

	public double getHum() {
		return hum;
	}

	public void setHum(double hum) {
		this.hum = hum;
	}

	public double getTemp() {
		return temp;
	}

	public void setTemp(double temp) {
		this.temp = temp;
	}

	public double getVolts() {
		return volts;
	}

	public void setVolts(double volts) {
		this.volts = volts;
	}

	public double getLum() {
		return lum;
	}

	public void setLum(double lum) {
		this.lum = lum;
	}

	public int getWindDir() {
		return windDir;
	}

	public void setWindDir(int windDir) {
		this.windDir = windDir;
	}

	public double getWindSpeed() {
		return windSpeed;
	}

	public void setWindSpeed(double windSpeed) {
		this.windSpeed = windSpeed;
	}

	public double getRainfall() {
		return rainfall;
	}

	public void setRainfall(double rainfall) {
		this.rainfall = rainfall;
	}

	public long getPressure() {
		return pressure;
	}

	public void setPressure(long pressure) {
		this.pressure = pressure;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Reading [id=" + id + ", node=" + node + ", hum=" + hum + ", temp=" + temp + ", volts=" + volts
				+ ", lum=" + lum + ", windDir=" + windDir + ", windSpeed=" + windSpeed + ", rainfall=" + rainfall
				+ ", pressure=" + pressure + ", status=" + status + "]";
	}
}
