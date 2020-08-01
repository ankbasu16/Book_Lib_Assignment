package com.java.springbootstarter.library;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.java.springbootstarter.library.Library;
import java.util.*;

@RestController
public class LibraryController {
	
	@Autowired
	private LibraryService libraryService;
	
	@RequestMapping("/libraries")
	public List<Library> getAllLibraries() {
		return libraryService.getAllLibraries();
	}
	
	@RequestMapping("/libraries/{id}")
	public Library getLibrary(@PathVariable String id) {
		return libraryService.getLibrary(id);
	}
	
	@RequestMapping(method=RequestMethod.POST,value = "/libraries")
	public void addLibrary(@RequestBody Library library) {
		libraryService.addLibrary(library);
		
	}
	
	@RequestMapping(method=RequestMethod.PUT,value = "/libraries/{id}")
	public void updateLibrary(@RequestBody Library library,@PathVariable String id) {
		libraryService.updateLibrary(library,id);
		
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value = "/libraries/{id}")
	public void deleteLibrary(@PathVariable String id) {
		 libraryService.deleteLibrary(id);
		
	}

}
