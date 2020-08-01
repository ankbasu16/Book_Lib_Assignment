package com.java.springbootstarter.book;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book,String>{
	
	public List<Book> findByLibraryId(String libraryId); // custom method

}
