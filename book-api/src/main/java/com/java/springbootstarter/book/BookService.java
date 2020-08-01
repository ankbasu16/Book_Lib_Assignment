package com.java.springbootstarter.book;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
	
	

	/*private List<Library> libraries  =new ArrayList<>( Arrays.asList(new Library("Lib1","Lib1 Name","Lib on 1st floor")
			,new Library("Lib2","Lib2 Name","Lib on 2nd floor")
			,new Library("Lib3","Lib3 Name","Lib on 3rd floor")));*/
	
	@Autowired
	private BookRepository bookRepository;

	public List<Book> getAllBooks(String libraryId){
		//return libraries;
		List<Book> books = new ArrayList<>();
		bookRepository.findByLibraryId(libraryId).
		forEach(books::add);
		return books;
	}

	public Book getBook(String id) {
		//return libraries.stream().filter(t -> t.getId().equals(id)).findFirst().get();
		return bookRepository.findById(id).get();

	}

	public void addBook(Book book) {
		//libraries.add(library);
		bookRepository.save(book);
	}
	
	public void updateBook(Book book) {

		/*for(int i=0;i<libraries.size();i++) {
			Library obj = libraries.get(i);
			if(obj.getId().equals(id)) {
				libraries.set(i,library);
				return;
			}
		}*/
		
		bookRepository.save(book);
	}
	
	public void deleteBook(String id ) {
		//libraries.removeIf(t -> t.getId().equals(id));
		bookRepository.deleteById(id);
	}
	
}
