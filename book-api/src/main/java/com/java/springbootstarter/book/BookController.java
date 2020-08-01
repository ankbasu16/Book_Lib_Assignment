package com.java.springbootstarter.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.java.springbootstarter.library.Library;
import java.util.*;

@RestController
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	@RequestMapping("/libraries/{id}/books")
	public List<Book> getAllBooks(@PathVariable String id) {
		return bookService.getAllBooks(id);
		
	}
	
	@RequestMapping("/libraries/{libraryId}/books/{id}")
	public Book getBook(@PathVariable String id) {
		return bookService.getBook(id);
	}
	
	@RequestMapping(method=RequestMethod.POST,value = "/libraries/{libraryId}/books")
	public void addBook(@RequestBody Book book,@PathVariable String libraryId) {
		book.setLibrary(new Library(libraryId,"",""));
		bookService.addBook(book);
		
	}
	
	@RequestMapping(method=RequestMethod.PUT,value = "/libraries/{libraryId}/books/{id}")
	public void updateBook(@RequestBody Book book,@PathVariable String libraryId,@PathVariable String id) {
		book.setLibrary(new Library(libraryId,"",""));
		bookService.updateBook(book);
		
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value = "/libraries/{libraryId}/books/{id}")
	public void deleteBook(@PathVariable String id) {
		bookService.deleteBook(id);
		
	}

}
