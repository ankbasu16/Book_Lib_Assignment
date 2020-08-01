package com.java.springbootstarter.book;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.java.springbootstarter.library.Library;

@Entity
public class Book {
	
	@Id
	private String id;
	private String name;
	private String description;
	
	
	@ManyToOne
	private Library library;
	
	
	public Book() {
		super();
		
	}


	public Book(String id, String name, String description,String libraryId) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.library = new Library(libraryId,"","");
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Library getLibrary() {
		return library;
	}


	public void setLibrary(Library library) {
		this.library = library;
	}
	
	
	

}
