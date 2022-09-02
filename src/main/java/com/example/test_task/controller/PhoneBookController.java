package com.example.test_task.controller;

import com.example.test_task.dto.PhoneBookDto;
import com.example.test_task.model.PhoneBook;
import com.example.test_task.repository.PhoneBookRepository;
import com.example.test_task.service.impl.PhoneBookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/records")
public class PhoneBookController {

    private final PhoneBookRepository phoneBookRepository;
    private final PhoneBookServiceImpl phoneBookService;

    @Autowired
    public PhoneBookController(PhoneBookRepository phoneBookRepository, PhoneBookServiceImpl phoneBookService) {
        this.phoneBookRepository = phoneBookRepository;
        this.phoneBookService = phoneBookService;
    }

    @GetMapping
    public Iterable<PhoneBook> getAllRecords() {
        return phoneBookRepository.findAll();
    }

    @PostMapping
    public PhoneBook createNewRecord(@RequestBody PhoneBookDto phoneBookDto) {
        return phoneBookService.createNewRecord(phoneBookDto);
    }

    @PutMapping
    public Iterable<PhoneBook> updateAllRecords() {
        return phoneBookService.updateRecords();
    }

    @GetMapping("/{id}")
    public PhoneBook getRecordById(@PathVariable Long id) {
        return phoneBookService.getRecordById(id);
    }

    @PutMapping("/{id}")
    public PhoneBook updateRecord(@PathVariable Long id, @RequestBody PhoneBookDto phoneBookDto) {
        return phoneBookService.updateRecord(id, phoneBookDto);
    }

    @DeleteMapping("/{id}")
    public void deleteRecord(@PathVariable Long id) {
        phoneBookRepository.deleteById(id);
    }
}
